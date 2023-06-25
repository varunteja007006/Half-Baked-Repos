import LearnCheckboxes from "./component/main/LearnCheckboxes";
import LearnChildrenProp from "./component/main/LearnChildrenProp";
import LearnFramer from "./component/main/LearnFramer";
import LearnUseReducer from "./component/main/LearnUseReducer";
import LearnUseRedux from "./component/main/LearnUseRedux";

function App() {
  return (
    <div className="app p-5 flex flex-col gap-5 bg-emerald-100">
      {/* I dont want to render the below paragraph for this component LearnChildrenProp */}
      {/* <p>Hi there, How are you? 😃</p> */}
      <LearnChildrenProp
        title={"No Children Props"}
        subtitle={"This is a demo"}
      ></LearnChildrenProp>
      <LearnChildrenProp
        title={"There is a Children Props"}
        subtitle={"This is a demo"}
      >
        <p>Hi there, How are you? 😃</p>
      </LearnChildrenProp>
      <LearnFramer></LearnFramer>
      <LearnUseReducer></LearnUseReducer>
      <LearnUseRedux></LearnUseRedux>
      <LearnCheckboxes></LearnCheckboxes>
      {/* 
      Try to learn useCallback
      Try to learn useMemo
      Try to learn Memo
      Try to learn useRef
      Try to learn Transition
      Try to learn Suspence
      */}
    </div>
  );
}

export default App;
