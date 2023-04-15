function interact(e) 
{
	SimpleSphere(e,5,5,3); //e,가로 길이,세로 길이,원 크기
}
function SimpleSphere(e,horizontalCircles,verticalCircles,sphereRadius)//원,타원형 만들기
{
    var pi = Math.PI
    for (var i = 0; i <= pi; i += pi / horizontalCircles) {
        var radius = Math.sin(i) * (sphereRadius - 1);
        var y = Math.cos(i) * (sphereRadius - 1);

        for (var a = 0; a < pi * 2; a += pi / verticalCircles) {
            var x = Math.cos(a) * radius;
            var z = Math.sin(a) * radius;

            e.npc.world.spawnParticle("flame", e.npc.x + x, e.npc.y + 4 + y, e.npc.z + z, 0, 0, 0, 0, 1);
        }
    }
}


function interact(e)
{
	var world = e.npc.getWorld();
	drawLine(e,world,e.npc.getPos(),e.player.getPos(),7,"crit",5);
}
function drawLine(e,world, pos1, pos2, resolution, particle) //x,y선잇기 월드,좌표,좌표,선 굵기,
{
    var resolution = resolution || 1; // Draw 1 particle per block
    var particle = particle || "endRod"; // Particle Id
    var NpcAPI = Java.type("noppes.npcs.api.NpcAPI").Instance();
    
    var drawAmount = Math.ceil(pos1.distanceTo(pos2))*resolution;

    var subs = pos2.subtract(pos1);
    for(var i = 0; i < drawAmount; i++) // Draw all particles
    {
        var x = (pos1.getX() + subs.getX()*(i/drawAmount)+0.5).toFixed(4);
        var y = (pos1.getY() + subs.getY()*(i/drawAmount)+0.5).toFixed(4);
        var z = (pos1.getZ() + subs.getZ()*(i/drawAmount)+0.5).toFixed(4);
        var cords =  x + " " + y + " " + z;
        //var output = NpcAPI.executeCommand(world, "particle " + particle + " "+ cords + " 0 0 0 0 1 force @a " + colour);
		e.npc.world.spawnParticle(particle, x,y,z, 0, 0, 0, 0, 1);
    }
}
