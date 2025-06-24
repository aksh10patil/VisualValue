export default function Footer() {
    return (
      <footer className="w-full mt-5 px-6 sm:px-8 md:px-6 max-w-screen-lg mx-auto py-10 text-sm text-gray-400  border-white/10">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-center sm:text-left">© {new Date().getFullYear()} Visual Value — Built with clarity</p>
  
          <div className="flex gap-6 text-gray-400">
            <a
              href="https://twitter.com/awxshhhh"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Twitter
            </a>
            <a
              href="https://github.com/aksh10patil"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              GitHub
            </a>
            <a
              href="https://twitter.com/awxshhhh"
              className="hover:text-white transition"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    );
  }
  