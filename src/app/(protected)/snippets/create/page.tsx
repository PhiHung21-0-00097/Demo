import SnippetForm from "@/components/snippet/SnippetForm";

export default function CreateSnippetPage() {
  return (
    <div className="bg-[#abb8c3] min-h-screen">
      <div className="container">
        <div className="h-full ">
          <h1 className="text-center text-2xl font-bold yt-6 mb-4 text-white">
            Please share the source code you like !!!
          </h1>
          <SnippetForm />
        </div>
      </div>
    </div>
  );
}
