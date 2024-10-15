import { useFormContext } from "react-hook-form"
import { IFormInput } from "../interface"

const snowDepths = [
  '0 < daily snow depth < 20',
  '20 < daily snow depth < 40',
  '40 < daily snow depth < 60',
  '60 < daily snow depth < 80',
  '80 < daily snow depth < 100',
  '100 < daily snow depth < 120',
  '120 < daily snow depth < 140',
  '140 < daily snow depth < 160',
  '160 < daily snow depth < 180',
  '180 < daily snow depth < 200',
  '200 < daily snow depth< 220',
  '220 < daily snow depth < 240',
  '240 < daily snow depth < 260',
  '260 < daily snow depth < 280',
  '280 < daily snow depth < 300',
  '300 < daily snow depth < 320',
  '320 < daily snow depth < 340',
  '340 < daily snow depth < 360',
  '360 < daily snow depth < 380',
  '380 < daily snow depth < 400',
  '400 < daily snow depth < 420',
  '420 < daily snow depth < 440',
  '440 < daily snow depth< 460',
  '460 < daily snow depth < 480',
  '480 < daily snow depth < 500',
  '500 < daily snow depth < 520',
  '520 < daily snow depth < 540',
  '540 < daily snow depth < 560',
  '560 < daily snow depth < 580',
  '580 < daily snow depth < 600',
  'daily snow depth > 600',
  'not use'
]


export function SnowDepth() {
  const form = useFormContext<IFormInput>()

  return (
    <>
      <label className="col-span-2 md:col-span-1">Snow Depth</label>
      <select className="col-span-2 md:col-span-1" {...form.register('snowDepth', {
        valueAsNumber: true
      })}>
        { snowDepths.map((snowDepth, i) => (
          <option key={i} value={i}>
            {snowDepth}
          </option>
        )) }
      </select>
    </>
  )
}
