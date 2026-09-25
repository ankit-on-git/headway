import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { AccountInfo } from '../types';

interface AccountViewProps {
  account: AccountInfo;
  onUpdateAccount: (updated: Partial<AccountInfo>) => void;
}

export const AccountView: React.FC<AccountViewProps> = ({ account, onUpdateAccount }) => {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValue, setTempValue] = useState<string>('');
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const startEdit = (field: string, currentValue: string) => {
    setEditingField(field);
    setTempValue(currentValue);
  };

  const handleSave = (field: string) => {
    if (field === 'fullName') onUpdateAccount({ fullName: tempValue });
    if (field === 'username') onUpdateAccount({ username: tempValue });
    if (field === 'email') onUpdateAccount({ email: tempValue });
    if (field === 'country') onUpdateAccount({ country: tempValue });

    setEditingField(null);
    setSaveMessage(`Successfully updated ${field}!`);
    setTimeout(() => setSaveMessage(null), 2500);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const fields = [
    { id: 'fullName', label: 'Full name', value: account.fullName },
    { id: 'username', label: 'Username', value: account.username },
    { id: 'email', label: 'Email address', value: account.email },
    { id: 'password', label: 'Password', value: '••••••••••••' },
    { id: 'country', label: 'Country or region', value: account.country },
  ];

  return (
    <div id="account-view" className="p-8 max-w-4xl mx-auto">
      {saveMessage && (
        <div className="mb-4 px-4 py-2 bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs rounded font-medium flex items-center gap-2">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{saveMessage}</span>
        </div>
      )}

      {/* Account Info Cards */}
      <div className="space-y-3">
        {fields.map((f) => {
          const isEditing = editingField === f.id;

          return (
            <div
              key={f.id}
              className="bg-white border border-gray-300 rounded p-4 flex items-center justify-between shadow-2xs hover:border-gray-400 transition-colors"
            >
              {/* Left: Field Name */}
              <div className="w-1/3 text-gray-700 text-xs font-medium">
                {f.label}
              </div>

              {/* Center: Current Value or Input */}
              <div className="flex-1 text-center font-bold text-gray-900 text-xs">
                {isEditing ? (
                  <div className="flex items-center justify-center gap-2">
                    <input
                      type={f.id === 'password' ? 'password' : 'text'}
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="px-2.5 py-1 text-xs border border-[#701563] rounded focus:outline-none focus:ring-1 focus:ring-[#701563] w-64 text-center font-normal"
                      autoFocus
                    />
                    <button
                      onClick={() => handleSave(f.id)}
                      className="p-1 text-emerald-600 hover:bg-emerald-50 rounded cursor-pointer"
                      title="Save"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleCancel}
                      className="p-1 text-red-500 hover:bg-red-50 rounded cursor-pointer"
                      title="Cancel"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span>{f.value}</span>
                )}
              </div>

              {/* Right: EDIT button */}
              <div className="w-20 text-right">
                {!isEditing && (
                  <button
                    onClick={() => startEdit(f.id, f.value)}
                    className="text-gray-500 hover:text-gray-900 text-xs font-medium tracking-wide uppercase cursor-pointer"
                  >
                    EDIT
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Privacy Policy Footer Note */}
      <div className="mt-8 text-gray-600 text-xs leading-relaxed space-y-3 max-w-3xl">
        <p>
          Our <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Oxford University Press Privacy Policy: Your data is secure and strictly protected.'); }} className="text-[#701563] underline font-medium hover:text-[#520e48]">Privacy Policy</a> sets out how Oxford University Press handles your personal information, and your rights to object to your personal information being used for marketing to you or being processed as part of our business activities.
        </p>
        <p>
          We will only use your personal information to provide you with this service.
        </p>
      </div>
    </div>
  );
};
