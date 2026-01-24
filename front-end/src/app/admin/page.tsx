'use client';

export default function AdminHome() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* TODO: Display admin stats:
          - Total users
          - Total questions
          - Reported content count
          - System health
        */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          {/* TODO: Recent reports/moderation actions */}
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          {/* TODO: System activity log */}
        </div>
      </div>
    </div>
  );
}
