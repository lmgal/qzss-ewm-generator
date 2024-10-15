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
        <div key={i} className="grid gap-3">
            {instructs.map((instruct, j) => (
                <div key={instruct.id} className="grid grid-cols-7 lg:flex gap-2">
                    <input
                        className="col-span-2"
                        placeholder="Code"
                        {...form.register(`customLibrary.${i}.instructs.${j}.code`)}
                    />
                    <textarea
                        className="col-span-4"
                        placeholder="Detail"
                        {...form.register(`customLibrary.${i}.instructs.${j}.detail`)}
                    />
                    <button 
                        type="button" 
                        onClick={() => remove(j)}
                        className="py-2 px-4 rounded border border-gray-500 col-span-1 text-xs text-center"
                    >
                        &#10060;
                    </button>
                </div>
            ))}
            { canBitsHoldInstructs && <button
                type="button"
                className='py-2 px-4 rounded border border-gray-500'
                onClick={() => {
                    append({ code: "", detail: "" })
                }}
            >
                Add Instruct
            </button> }
        </div>
    )
}
