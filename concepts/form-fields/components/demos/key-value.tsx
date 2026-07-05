import {
  KeyValue,
  KeyValueAdd,
  KeyValueItem,
  KeyValueKeyInput,
  KeyValueList,
  KeyValueRemove,
  KeyValueValueInput,
} from "@/components/ui/key-value";
 
export function KeyValueDemo() {
  return (
    <KeyValue>
      <KeyValueList>
        <KeyValueItem>
          <KeyValueKeyInput />
          <KeyValueValueInput placeholder="Test" />
          <KeyValueRemove />
        </KeyValueItem>
      </KeyValueList>
      <KeyValueAdd />
    </KeyValue>
  );
}