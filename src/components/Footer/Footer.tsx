import downloadApple from '../../assets/images/download-apple.svg';
import downloadAndroid from '../../assets/images/download-android.svg';

import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="footer__download">
        <img src={downloadApple} alt="Download on the App Store" />
        <img src={downloadAndroid} alt="Download on Google Play" />
      </div>
      <p className="footer__contact">
        Got any feedback? Up for a chat? Shoot me an email or direct message the
        socials below.
      </p>
      <ul className="footer__socials">
        <li>
          <a href="https://github.com/2021a1r057">
            <i className="fa-brands fa-github"></i>
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/adityazalpuri/">
            <i className="fa-brands fa-linkedin"></i>
          </a>
        </li>
        <li>
          <a href="mailto:2021a1r057@mietjammu.in">
            <i className="fa-solid fa-envelope"></i>
          </a>
        </li>
      </ul>
      <div className="footer__copyright">
        <p>&copy; 2024 STELLAR. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
