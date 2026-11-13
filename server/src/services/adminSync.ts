import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export async function syncAdminUser(): Promise<void> {
  const username = (process.env.ADMIN_USERNAME || 'admin').trim();
  const password = (process.env.ADMIN_PASSWORD || 'change-me').trim();

  const email = username.includes('@')
    ? username.toLowerCase()
    : `${username.toLowerCase()}@global-logisticssolution.com`;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const existingAdmin = await User.findOne({
      $or: [{ email }, { role: 'admin' }],
    });

    if (existingAdmin) {
      existingAdmin.name = 'Administrator';
      existingAdmin.email = email;
      existingAdmin.password = hashedPassword;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log(`[auth] Admin user updated in MongoDB: ${email}`);
    } else {
      await User.create({
        name: 'Administrator',
        email,
        password: hashedPassword,
        role: 'admin',
      });
      console.log(`[auth] Admin user created in MongoDB: ${email}`);
    }
  } catch (err) {
    console.error('[auth] Failed to sync admin user in MongoDB:', err);
  }
}


