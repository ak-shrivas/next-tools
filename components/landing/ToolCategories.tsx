export function ToolCategories() {
    const categories = [
      { name: "Finance", icon: "💰", desc: "EMI, Tax, Investment & Budgeting" },
      { name: "Tech", icon: "💻", desc: "Code generators, Regex tools, etc." },
      { name: "Health", icon: "🩺", desc: "BMI, Calorie, Water intake, etc." },
      { name: "Education", icon: "📚", desc: "Grade, GPA, and learning tools" },
    ];
  
    return (
      <section id="tools" className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">Explore Tool Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {categories.map((cat, idx) => (
            <div key={idx} className="bg-blue-50 p-6 rounded-xl shadow hover:shadow-md">
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{cat.name}</h3>
              <p className="text-sm text-gray-600">{cat.desc}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }