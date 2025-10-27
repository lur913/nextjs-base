export default function TypographyPage() {
  return (
    <div>
      <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
        Taxing Laughter: The Joke Tax Chronicles
      </h1>
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        The People of the Kingdom
      </h2>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        The Joke Tax
      </h3>
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
        it&apos;s only fair that they should pay for the privilege.&quot;
      </blockquote>

      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full">
          <thead>
            <tr className="even:bg-muted m-0 border-t p-0">
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                King's Treasury
              </th>
              <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                People's happiness
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Empty
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Overflowing
              </td>
            </tr>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Modest
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Satisfied
              </td>
            </tr>
            <tr className="even:bg-muted m-0 border-t p-0">
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Full
              </td>
              <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Ecstatic
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
        @radix-ui/react-alert-dialog
      </code>
    </div>
  );
}
