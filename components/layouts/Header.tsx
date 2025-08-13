export function Header() {
    return (
      <header className="flex justify-between items-center px-6 py-4 shadow bg-white sticky top-0 z-50">
        <div className="text-2xl font-bold text-blue-600">ToolStack</div>
        <nav className="space-x-6 text-sm text-gray-700">
          <a href="#tools" className="hover:text-blue-600">Tools</a>
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#about" className="hover:text-blue-600">About</a>
          <a href="#contact" className="hover:text-blue-600">Contact</a>
        </nav>
      </header>
    );
  }
  