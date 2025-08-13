export function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-6 px-6 text-sm text-center">
        <div className="mb-2">© {new Date().getFullYear()} ToolStack. All rights reserved.</div>
        <div className="space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
      </footer>
    );
  }