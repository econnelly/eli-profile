import type { Metadata } from 'next';
import './globals.css';
import fs from 'fs/promises';
import path from 'path';

/**
 * Interface for the social links.
 */
interface ISocialLink {
  label: string;
  url: string;
}

/**
 * Interface for the profile data.
 */
interface IProfileData {
  name: string;
  introduction: string;
  socialLinks: ISocialLink[];
}

/**
 * Fetches the profile data from the JSON file.
 *
 * @returns {Promise<IProfileData>} The profile data.
 */
async function getProfileData(): Promise<IProfileData> {
  const filePath = path.join(process.cwd(), 'src/data/profile.json');
  const fileData = await fs.readFile(filePath, 'utf8');
  return JSON.parse(fileData);
}

/**
 * Dynamic metadata generation for the site.
 *
 * @returns {Promise<Metadata>} The generated metadata.
 */
export async function generateMetadata(): Promise<Metadata> {
  const profileData = await getProfileData();
  return {
    title: `${profileData.name} | Profile`,
    description: `A friendly introduction to ${profileData.name} - Mobile Developer, Embedded Systems Enthusiast, Baker, and Gamer.`,
  };
}

/**
 * Interface for the RootLayout props.
 */
interface IRootLayoutProps {
  children: React.ReactNode;
}

/**
 * Root Layout component for the application.
 *
 * @param {IRootLayoutProps} props - The component props.
 * @returns {Promise<JSX.Element>} The rendered layout.
 */
export default async function RootLayout({
  children,
}: Readonly<IRootLayoutProps>) {
  const profileData = await getProfileData();

  return (
    <html lang="en">
      <body>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} {profileData.name}</p>
        </footer>
      </body>
    </html>
  );
}
