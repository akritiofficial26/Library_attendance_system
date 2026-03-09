// prisma/seed.js
import pkg from '@prisma/client';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

async function main() {
  await prisma.student.createMany({
    data: [
      { collegeId: '202204211', fullName: 'Aniket Adarsh', email: 'aniket@college.com' },
      { collegeId: '202204126', fullName: 'Akriti Kumari', email: 'akriti@college.com' },
      { collegeId: '2024013091', fullName: 'Anjali Kumari', email: 'anjali@college.com' },
      { collegeId: '202204143', fullName: 'Aditya Sharma', email: 'aditya@college.com' }
    ],
  });
  console.log('Students seeded');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());