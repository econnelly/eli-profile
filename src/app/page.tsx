import Image from 'next/image';
import fs from 'fs/promises';
import path from 'path';

/**
 * Interface for an interest item.
 */
interface IInterest {
  title: string;
  description: string;
  order?: number;
}

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
 * Interest card component.
 *
 * @param {IInterest} interest - The interest to display.
 * @returns {JSX.Element} The rendered interest card.
 */
function InterestCard({ title, description }: IInterest) {
  return (
    <div className="interest-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
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
 * Fetches all interest data from the src/data/interests directory.
 *
 * @returns {Promise<IInterest[]>} The list of interests.
 */
async function getInterests(): Promise<IInterest[]> {
  const interestsDir = path.join(process.cwd(), 'src/data/interests');
  const files = await fs.readdir(interestsDir);
  
  const interests = await Promise.all(
    files
      .filter(file => file.endsWith('.json'))
      .map(async (file) => {
        const filePath = path.join(interestsDir, file);
        const fileData = await fs.readFile(filePath, 'utf8');
        return JSON.parse(fileData) as IInterest;
      })
  );

  return interests.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Home page component for the Eli Connelly profile.
 *
 * @returns {Promise<JSX.Element>} The rendered home page.
 */
export default async function Home() {
  const [profileData, interests] = await Promise.all([
    getProfileData(),
    getInterests()
  ]);

  return (
    <main>
      <section className="profile-section">
        <Image
          src="/avataaars.png"
          alt={`${profileData.name} Avatar`}
          width={150}
          height={150}
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

      <section>
        <h2>What I'm into</h2>
        <div className="interests-grid">
          {interests.map((interest) => (
            <InterestCard key={interest.title} {...interest} />
          ))}
        </div>
      </section>
    </main>
  );
}
