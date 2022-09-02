HELLO IS    3

YOO   IS    $1
      LOC	#64
HELP  ADD   YOO, $1, 3+2*HELLO
	  SUB   $2,  $1, 1
	  MUL   $3,  $2, 2
	  JMP   TE4

	  ADD   $1,  $1, 3+2
TE1	  ADD   $4,  $1, 2
TE2	  SETL  $5,  $5, 2*2
YEE	  ADD   $4,  $1, 2
	  JMP   HELP

TE4	  TRAP  1, 2, 3

MAIN  IS    YEE