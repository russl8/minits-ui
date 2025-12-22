import { useEffect } from "react";
import { useCompilationResultContext } from "../context/compilationResultContext";
import { useCodeContext } from "../context/codeContext";
import { useLoadingContext } from "../context/loadingContext";

const CompileButton = () => {
  const { compilationResult, setCompilationResult } =
    useCompilationResultContext();
  const { code } = useCodeContext();
  const {setIsLoading} = useLoadingContext();

  async function compile() {
    setIsLoading(true)
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MINITS_API_URL}/api/compile`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      }
    );

    console.log(res);
    const data = await res.json();
    console.log("compile result:", data);
    setCompilationResult(data);
    setIsLoading(false)
  }

  return (
    <>
      <button
        onClick={compile}
        className="bg-backgroundDark py-2 px-4 text-lg text-white rounded-lg 
        font-bold justify-self-end cursor-pointer hover:opacity-55 transition-opacity duration-200"
      >
        Compile
      </button>
    </>
  );
};

export default CompileButton;
