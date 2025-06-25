function Footer() {
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="https://github.com" className="hover:text-gray-300">GitHub</a>
          <a href="https://twitter.com" className="hover:text-gray-300">Twitter</a>
          <a href="https://linkedin.com" className="hover:text-gray-300">LinkedIn</a>
        </div>
        <p>© {new Date().getFullYear()} Task Manager. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;