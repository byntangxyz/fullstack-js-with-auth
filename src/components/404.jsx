function NotFoundPage() {
  return (
    <>
      <div className="bg-[url(/bg.jpg)] bg-cover flex justify-center min-h-screen p-4 sm:p-6">
        <div className=" container max-w-5xl w-full pt-8 bg-blue-950/30 backdrop-blur-md shadow-xl rounded-xl px-4 sm:px-8">
          <div className="text-center pt-24 text-4xl">404 Not Found</div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
