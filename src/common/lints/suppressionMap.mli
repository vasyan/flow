(**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the "flow" directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 *)

(* Supports O(log(n)) queries to get the relevant suppression for a loc. *)
type t

(* Given a filename and a settings, generate a suppression map that spplies those
 * settings across the entire file. *)
val global_settings: Loc.filename -> LintSettings.t -> t
(* This isn't a particularly valid suppression map, but it's fine as long as
 * no-one tries to use it. (And even then it shouldn't break; it'll just make
 * no sense.) *)
val invalid_default: t
(* Gets the lint settings that apply to a certain location in the code. To
 * resolve ambiguity, this looks at the location of the first character in the
 * provided location. *)
val settings_at_loc: Loc.t -> t -> LintSettings.t

val is_suppressed: LintSettings.lint_kind -> Loc.t -> t -> bool

val union: t -> t -> t
(* combines settings collated by filename into one collection *)
val union_settings : t Utils_js.FilenameMap.t -> t


(* Supports O(m) operations to add a range of suppression rules, where m is
 * the number of rules. (assuming that the rules are processed in order) *)
 (* These functions were built with the case of all ranges belonging to the same file
  * in mind. It may or may not work in other cases. *)
type builder
(* Create a new builder for the provided file, using the provided base settings *)
val new_builder: Loc.filename -> LintSettings.t -> builder
(* Change the settings in the provided range by adding the provided settings list.
 * In the settings list, the kind is the type of lint, the bool is the enabled setting,
 * and the location is the position of the setting in the source code. *)
val update_settings:
  Loc.t -> (LintSettings.lint_kind * (bool * Loc.t)) list -> builder -> builder

val bake: builder -> t
