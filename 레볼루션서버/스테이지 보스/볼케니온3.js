var EntityType = Java.type('noppes.npcs.api.constants.EntityType');

function init(e)
{
	
	e.block.setModel("minecraft:magma");
}
function collide(e)
{
	if(e.entity.getType() == 1)
	{
		e.entity.damage(50);
	}
}