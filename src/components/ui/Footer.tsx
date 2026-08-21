const Footer = () => {
  return (
    <footer className="flex h-auto w-full flex-col items-center justify-center border-t-2 border-gray-50 bg-white py-4">
      <div className="mb-2 text-center">
        <span>{new Date().getFullYear()} &copy; </span>
        <a
          href="https://www.othentis.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 transition-colors duration-300 hover:text-blue-800"
        >
          www.yora.com
        </a>
      </div>
      <div className="flex justify-center space-x-4 text-sm">
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors duration-300 hover:text-blue-800"
        >
          Politique de Confidentialité
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary transition-colors duration-300 hover:text-blue-800"
        >
          Mentions légales
        </a>
      </div>
    </footer>
  )
}

export default Footer
