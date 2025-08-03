import { Pencil, Camera } from "lucide-react";

interface ProfileProps {
  type: "admin" | "teacher" | "student";
  data: {
    firstName: string;
    lastName: string;
    dob?: string;
    email?: string;
    phone?: string;
    role?: string;
    country?: string;
    city?: string;
    postal?: string;
  };
  onUpload?: (file: File) => void;
}

export default function Profile({ type, data, onUpload }: ProfileProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-[#f9f9f9] min-h-screen">
      <main className="flex-1 space-y-6">
        {/* Header */}
        <div className="bg-white shadow rounded-xl p-6 flex items-center gap-4">
          <div className="relative">
            <img
              src="/avatar.png"
              className="w-20 h-20 rounded-full border-4 border-white shadow object-cover"
            />
            {type !== "student" && onUpload && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onUpload(file);
                  }}
                />
                <button className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {data.firstName} {data.lastName}
            </h2>
            <p className="text-sm text-gray-500 capitalize">
              {type} • {data.city}
            </p>
          </div>
        </div>

        {/* Personal Info */}
        <section className="bg-white rounded-xl p-6 shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#252B42]">
              Personal Information
            </h3>
            <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-400 flex items-center gap-1">
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Info label="First Name" value={data.firstName} />
            <Info label="Last Name" value={data.lastName} />
            <Info label="Date of Birth" value={data.dob || "-"} />
            <Info label="Email Address" value={data.email || "-"} />
            <Info label="Phone Number" value={data.phone || "-"} />
            <Info label="User Role" value={data.role || type} />
          </div>
        </section>

        {/* Address */}
        <section className="bg-white rounded-xl p-6 shadow space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-[#252B42]">Address</h3>
            <button className="text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-400 flex items-center gap-1">
              <Pencil className="w-4 h-4" /> Edit
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <Info label="Country" value={data.country || "-"} />
            <Info label="City" value={data.city || "-"} />
            <Info label="Postal Code" value={data.postal || "-"} />
          </div>
        </section>
      </main>
    </div>
  );
}

const Info = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-gray-400">{label}</p>
    <p className="font-medium text-[#252B42]">{value}</p>
  </div>
);
