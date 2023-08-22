const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const data = require('./data.json');

const importEventClustersToPrisma = async () => {
  try {
    for (const item of data) {
      await prisma.eventCluster.create({
        data: {
          name: item.area,
        },
      });
    }

    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

const importEventsToPrisma = async () => {
  try {
    for (const item of data) {
      const data = await prisma.eventCluster.findFirst({
        where: {
          name: item.area,
        },
      });
      for (const event of item.events) {
        await prisma.event.create({
          data: {
            ...event,
            eventClusterId: data.id,
          },
        });
      }
    }

    console.log('Data imported successfully.');
  } catch (error) {
    console.error('Error importing data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

importEventsToPrisma();
