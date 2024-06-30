import { IFormInput } from "../interface"
import { UseFormReturn, useFieldArray } from "react-hook-form"

export function InstructsInput({ form, i } : { 
    form: UseFormReturn<IFormInput>,
    i: number
}) {
    const { fields: instructs, append, remove } = useFieldArray({
        control: form.control,
        name: `customLibrary.${i}.instructs`,
    })
    const watchBits = form.watch(`customLibrary.${i}.bits`)

    const canBitsHoldInstructs = watchBits && 
        watchBits ** 2 >= instructs.length

    return (
        <div key={i}>
            {instructs.map((instruct, j) => (
                <div key={instruct.id}>
                    <input
                        {...form.register(`customLibrary.${i}.instructs.${j}.code`)}
                    />
                    <input
                        {...form.register(`customLibrary.${i}.instructs.${j}.detail`)}
                    />
                    <button type="button" onClick={() => remove(j)}>
                        Remove
                    </button>
                </div>
            ))}
            { canBitsHoldInstructs && <button
                type="button"
                onClick={() => {
                    append({ code: "", detail: "" })
                }}
            >
                Add Instruct
            </button> }
        </div>
    )
}