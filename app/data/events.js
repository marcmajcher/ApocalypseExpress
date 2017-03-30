'use strict';

/* In here, we're going to build a grammar for events while traveling.
   We'll start off with color events, and go from there. */

/* Oh, man, we're going to have to build a grammar engine for this, aren't we?
  Well, hey, at least we can use it for name generation, too.

  Actually, we can probably use or modify these:
    https://github.com/dhconnelly/erratic
    https://github.com/dhconnelly/prettybnf

    I'd like to add some weighting to the BNF syntax, though, so we can have stuff like:

    <event> ::= <enemy> | <animals/2> | <loot> | <weather/5>;

    so that when we do a random selection, some are more likely to come up than others
   */

/*
<event> ::= <timeEvent> | <locationEvent> | <weatherEvent> |
            <creatureEvent> | <weirdEvent> | <humanEvent>;

<timeEvent> ::= ... ;

<locationEvent> ::= ... ;

<weatherEvent> ::= ... ;

<creatureEvent> ::= ... ;

<weirdEvent> ::= ... ;

<humanEvent> ::= ... ;

*/

/*
Time-specific events
  sunrise
  sunset
  noon
  night

Location-specific events

Weather events
  dry patch
  sudden rainstorm
  no clouds lightning
  sandstorm/duststorm
  dust devils

Creature encounters
  giant scorpions (or other insects)
  antler bunnies
  squished roadkill [animal]
  flock of [ominous flying birds/animals]

Weirdness
  strange lights in the distance
  voices from nowhere
  smell of [something]
  all your hairs stand on end
  static fields
  sudden metallic taste
  sudden silence
  a trembling in the earth

Time modifiers
  sudden
  gradually
  all at once

People
  other harmless travelers
  other dangerous travelers that ignore you
  small camps on the side of the road

Distance modifiers
  on the side of the road
  in the distance
  a few miles ahead
  above you

Death
  bones bleaching in the sun
  a corpse tied to a pole
  a pile of what looks like hair
  skin stretched across a road sign

Signs of life
  an abandoned stuffed bear
  a pair of shoes in the road
  a blown out tire


*/
