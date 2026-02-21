import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';

/**
 * Interface for a social media link.
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
 * Home page component for the Eli Connelly profile.
 *
 * @returns {Promise<JSX.Element>} The rendered home page.
 */
export default async function Home() {
  const profileData = await getProfileData();

  return (
    <main>
      <section className="profile-section">
        <Image
          src="/eli_profile_avatar.png"
          alt={`${profileData.name} Avatar`}
          width={320}
          height={208}
          priority
          className="avatar"
        />
        <h1 className="intro-title">Hi, I'm {profileData.name}</h1>
        <p>{profileData.introduction}</p>
        <div className="social-links">
          {profileData.socialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noopener noreferrer" className="social-link">
              {link.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
