import { type Meta, type StoryObj } from "@storybook/react";
import Table, { type TableProps } from "..";

export default {
  title: "Components/Table",
  component: Table
} as Meta<typeof Table>;

type Story = StoryObj<typeof Table>;

export const Basic: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Table.....",
      },
    },
  },
  render: (props: TableProps) => ( 
    <div style={{maxHeight: "400px", overflow: "auto"}}>
    <Table {...props} data={new Array(1000).fill(new Array(4).fill(true))} freezeFirstColumn freezeHeader freezeFooter>
        <Table.Column>
        <Table.CellHeader>Header 1</Table.CellHeader>
        <Table.Cell>{(cell: any) => <span>{`${cell.rowIndex},${cell.columnIndex}`}</span>}</Table.Cell>
          <Table.CellFooter>Footer 1</Table.CellFooter>
        </Table.Column>
        <Table.Column>
          <Table.CellHeader>Header 2</Table.CellHeader>
          <Table.Cell>{(cell: any) => <span>{`${cell.rowIndex},${cell.columnIndex}`}</span>}</Table.Cell>
          <Table.CellFooter>Footer 2</Table.CellFooter>
        </Table.Column>
        <Table.Column>
          <Table.CellHeader>Header 3</Table.CellHeader>
          <Table.Cell>{(cell: any) => <span>{`${cell.rowIndex},${cell.columnIndex}`}</span>}</Table.Cell>
          <Table.CellFooter>Footer 3</Table.CellFooter>
        </Table.Column>
        <Table.Column>
          <Table.CellHeader>Header 4</Table.CellHeader>
          <Table.Cell>{(cell: any) => <span>{`${cell.rowIndex},${cell.columnIndex}`}</span>}</Table.Cell>
          <Table.CellFooter>Footer 4</Table.CellFooter>
        </Table.Column>
    </Table>
    </div>
  ),
}; //events: onSelect, onResize, onMove

//<Table.Empty></Table.Empty>