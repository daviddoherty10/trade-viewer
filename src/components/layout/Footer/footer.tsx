import { FaHeart } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white p-4 text-center">
      <p>
        &copy; 2024 Your App. All rights reserved. Made with <FaHeart className="text-red-500" /> by Your Team
      </p>
    </footer>
  );
};

