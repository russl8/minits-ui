// public CompileResult(boolean success, List<String> semanticErrors, List<ClassResult> classes) {
//     this.success = success;
//     this.semanticErrors = semanticErrors;
//     this.classes = classes;
// }

// public class ClassResult {
//     public String className;
//     public Map<String, Object> evaluatedVars;

//     public ClassResult(String className, Map<String, Object> evaluatedVars) {
//         this.className = className;
//         this.evaluatedVars = evaluatedVars;
//     }
// }


export type ClassResult={
    className:string;
    evaluatedVars: Record<string,string>;

}

export type CompilationResult = {
  success: boolean;
  errors : Array<string>;
  classes: Array<ClassResult>;
} | null; 
