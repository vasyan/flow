//setting up for next test
//flowlint sketchy-null:off

//error: not a real lint or setting, but sketchy-null is still enabled
/*flowlint not-a-real-lint : not-a-real-setting   ,
    sketchy-null:on */

// ExistsP sketchy checks

// maybe
function f(x: ?number) {
  //not suppressed because the suppression comes after it on the line
  if (x) {/* sketchy */}/* flowlint sketchy-null:off */
}

// union
function h(x: number|null) {
  if (x) { /* sketchy; suppressed */ }
}

// non-void, non-null
function g(x: number) {
  if (x) { /* NOT sketchy */ }
}

// non-falsey prim
function k(x: null | 1) {
  if (x) { /* NOT sketchy */ }
}

//multi-line test

/*

	 flowlint

  	 sketchy-null-bool:on,

  	 sketchy-null-mixed:on

 	 */

var x1: ?bool = false;
if (x1) { /* sketchy */ }

//docblock-style tests

/*
 * flowlint
 * sketchy-null-bool:off,
 * sketchy-null-mixed:off
 *
 */

var x2: ?bool = false;
if (x2) { /* sketchy; suppressed */ }

/*
 * flowlint
 * sketchy-null:
 *    on,
 * sketchy-null-bool:
 *    off
 */

var x3: ?string = "";
if (x3) { /* sketchy */ }

// open, multiple lowers
function j(x) {
  if (x) { /* NOT sketchy because of calls */ }
}
j(null);
j("foo"); // non-falsey, non sketchy

function r(x) {
  if (x) { /* sketchy because of calls */ }
}
r(null);
r("")

function w(x) {
  if (x) { /* sketchy because of calls; suppressed */ }
}
w(null);
/*flowlint sketchy-null:off*/w("");/*flowlint sketchy-null:on*/

function s(x) {
  if (x) { /* sketchy because of calls */ }
}
s(null);
declare var unknown_str: string;
s(unknown_str); // possibly falsey, sketchy

// PropExistsP sketchy checks

// optional prop
function l(o: { p?: number }) {
  if (o.p) {/* sketchy; suppressed */} //flowlint-line sketchy-null:off
}

// maybe prop
function m(o: { p: ?number }) {
  /* flowlint-next-line sketchy-null:off */
  if (o.p) {/* sketchy; suppressed */}
}

// union
function n(o: { p: number|null|void }) {
  // flowlint sketchy-null:off
  // flowlint-next-line sketchy-null:on
  if (o.p) { /* sketchy */ }
  // flowlint sketchy-null:on
}

function q(o: { p: number }) {
  if (o.p) { /* NOT sketchy */ }
}

// Assignment

/*
Line suppressions don't have unexpected effects on later lines (the
unsuppression at the end of the line doesn't affect the existing range setting.)
*/
function z(x: ?string) {
  var assignee;
  //flowlint sketchy-null:off
  //flowlint-next-line sketchy-null:off
  if (assignee = x) { /* sketchy; suppressed */ }
  if (assignee = x) { /* sketchy; suppressed */ }
  //flowlint sketchy-null:on
}

var value: ?number = 0;
var defaultVal: number = 7;
var valToUse = value || /* flowlint-line sketchy-null:off */defaultVal; /* sketchy; suppressed */

var alwaysFalse = false && value; /* NOT sketchy */
var alwaysTrue = true || value; /* NOT sketchy */

//flowlint sketchy-null:on
var val2: ?number = 0;
//flowlint sketchy-null:off

var sketchyFalse = val2 && false; /* sketchy */ /*flowlint-next-line sketchy-null:on*/ /* flowlint-line sketchy-null:on */
var sketchyTrue = val2 || true; /* sketchy */

//Malformed Rule Tests

//Extra commas (Error reporting is currently weird with zero-length locations at the end of a line.)
// flowlint ,sketchy-null-bool:on,,sketchy-null-mixed:off,

//Missing commas
// flowlint sketchy-null-bool:on sketchy-null-mixed:off

//Typo on flowlint (Not checked for at the moment. Perhaps in a future diff?)
// flowline sketchy-null:on

//Flowlint inside a comment (Not checked for at the moment. Perhaps in a future diff?)
/*
 * stuff, stuff, stuff
 * flowlint sketchy-null:on
 */
