var detectionRange = 10; //플레이어 감지 범위
var monsterDamage = 70; //몬스터 데미지
var playerUp = 5; //플레이어가 공중에 뜨는 높이
var acountTime = 10; //공중 패턴 시간
var acount = 0;
var isAttack = false;
function init(e)
{
	acount = 0;
}
function target(e)
{
	isAttack = true;
}
function targetLost(e)
{
	isAttack = false;
}
function tick(e)
{
	if(isAttack)
	{
		var playerY;
		var Pos = e.npc.getPos();
		var nearby = e.npc.getWorld().getNearbyEntities(Pos,detectionRange,1); //플레이어 감지
		acount += 1;
		if(acount >= acountTime)
		{
			for(var i = 0; i < nearby.length; i++) 
			{
				playerY = nearby[i].getPos().getY();
				nearby[i].setPosition(nearby[i].getX(),nearby[i].getY()+playerUp,nearby[i].getZ());
				nearby[i].damage(monsterDamage);
			}
			acount = 0;
		}
	}
}