export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl text-gray-300 mb-8">Sahifa topilmadi</h2>
        <p className="text-gray-400 mb-8">
          Siz qidirgan sahifa mavjud emas yoki o'chirilgan.
        </p>
        <button
          onClick={() => window.history.back()}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Orqaga qaytish
        </button>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
