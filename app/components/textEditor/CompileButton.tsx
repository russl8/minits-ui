interface CompileButtonProps {
  code: string;
}

const CompileButton = ({ code }: CompileButtonProps) => {
  async function compile() {
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
  }

  return (
    <>
      <button onClick={compile}>Compile</button>
    </>
  );
};

export default CompileButton;
