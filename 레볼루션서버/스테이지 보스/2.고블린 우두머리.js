var meele;
var NpcAPI = Java.type('noppes.npcs.api.NpcAPI').Instance();

function init(e)
{
	 meele = e.npc.getStats().getMelee();
}
function meleeAttack(e)
{
	var ran = Math.floor(Math.random()* 100) ;
	if(ran < 70)
	{
		meele.setKnockback(3); //밀치기
		//e.npc.say(ran);
	}
	else
	{
		meele.setKnockback(0); //밀치기
		//e.npc.say(ran);
	}
}