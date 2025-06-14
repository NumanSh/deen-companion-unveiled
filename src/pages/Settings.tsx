
import React from "react";

const Settings = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-background pt-10 pb-24">
      <div className="max-w-md w-full mx-auto px-4">
        <h1 className="text-3xl font-bold mb-4 text-center">Settings</h1>
        <div className="space-y-4">
          <div className="bg-card rounded-lg shadow-md p-6 border text-center">
            <p className="text-muted-foreground">
              Settings coming soon. Adjust your preferences and personalize your experience here!
            </p>
          </div>
          {/* Settings options will go here in future */}
        </div>
      </div>
    </div>
  );
};

export default Settings;
