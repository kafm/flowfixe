import { type Meta, type StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import Form, { type FormProps } from "..";
import { Email, Secret } from "../../fields";
import { Button } from "../../button";

export default {
  title: "Components/Form",
  component: Form,
  //   parameters: {
  //     docs: {
  //       description: {
  //         component: "Abc",
  //       },
  //     },
  //   },
  //   decorators: [
  //     Story => (
  //       <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
  //         <Story />
  //       </div>
  //     ),
  //   ],
} as Meta;

/** An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info. */
export const Basic = ({ name }: FormProps) => (
  <div
    style={{
      width: "350px",
      border: "var(--ff-form-section-border)",
      borderRadius: "1rem",
      padding: "1.2rem",
    }}
  >
    <h3>{name}</h3>
    <br />
    <Form onChange={action("onChange")} onSubmit={action("onSubmit")}>
      <Form.Input>
        <Email name="email" label="Email" required />
      </Form.Input>
      <Form.Input>
        <Secret name="password" label="Password" required toggleVisibility />
      </Form.Input>
      <Form.Action>
        <Button type="submit" label="Login" size="md" stretch />
      </Form.Action>
    </Form>
  </div>
);

Basic.parameters = {
  docs: {
    description: {
      story:
        "An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info.",
    },
  },
};

Basic.args = {
  name: "Login",
};

Basic.argTypes = {
  name: {
    table: {
      type: { summary: "string" },
      defaultValue: { summary: "email" },
    },
    description: "dfdkjl",
    control: "inline-radio",
    options: ["email", "phone", "mail"],
  },
};

type Story = StoryObj<typeof Form>;

export const Another: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "An avatar can have a badge to indicate presence status. See the PresenceBadge component for more info.",
      },
    },
  },
  args: {
    name: "email",
  },
  argTypes: {
    name: {
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "email" },
      },
      description: "dfdkjl",
      control: "inline-radio",
      options: ["email", "phone", "mail"],
    },
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: "350px",
          border: "var(--ff-form-section-border)",
          borderRadius: "1rem",
          padding: "1.2rem",
        }}
      >
        {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
        <Story />
      </div>
    ),
  ],
  render: (props: FormProps) => (
    <Form
      {...props}
      onChange={action("onChange")}
      onSubmit={action("onSubmit")}
    >
      <Form.Input>
        <Email name="email" label="Email" required />
      </Form.Input>
      <Form.Input>
        <Secret name="password" label="Password" required toggleVisibility />
      </Form.Input>
      <Form.Action>
        <Button type="submit" label="Login" size="md" stretch />
      </Form.Action>
    </Form>
  ),
};
