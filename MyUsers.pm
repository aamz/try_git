package MyUsers;

use strict;
use warnings;

my $USERS = {
  'dinko.iliev'    => '1234',
  'sergio.caballero' => '1234',
  'rodolfo.estrada'    => '1234',
  'agustin.romero'    => '1234'
};

sub new { bless {}, shift }

sub check {
  my ($self, $user, $pass) = @_;

  # Success
  return 1 if $USERS->{$user} && $USERS->{$user} eq $pass;

  # Fail
  return undef;
}

1;