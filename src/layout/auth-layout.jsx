function AuthLayout({children}) {
  return (
    <>
      <div className="bg-[url(/bg.jpg)] bg-cover flex justify-center min-h-screen p-4 sm:p-6">
        <div className="container max-w-5xl w-full pt-8 bg-blue-950/30 backdrop-blur-md shadow-xl rounded-xl px-4 sm:px-8">
            {children}
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
