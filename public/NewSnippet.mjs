import {
	SvelteComponent,
	append,
	children,
	claim_element,
	claim_text,
	detach,
	element,
	init,
	insert,
	listen,
	noop,
	run_all,
	safe_not_equal,
	set_data,
	space,
	text
} from "svelte/internal";

function add_css() {
	var style = element("style");
	style.id = 'svelte-14udb42-style';
	style.textContent = "button.svelte-14udb42{background:var(--primary);color:var(--secondary);border:1px solid currentColor}h1.svelte-14udb42{color:tomato}label.svelte-14udb42{margin-bottom:1rem;font-weight:bold}";
	append(document.head, style);
}

function create_fragment(ctx) {
	var h1, t0, t1, t2, label0, t3, input0, t4, label1, t5, input1, t6, button, t7, dispose;

	return {
		c() {
			h1 = element("h1");
			t0 = text("hello ");
			t1 = text(ctx.fullName);
			t2 = space();
			label0 = element("label");
			t3 = text("First: ");
			input0 = element("input");
			t4 = space();
			label1 = element("label");
			t5 = text("Last: ");
			input1 = element("input");
			t6 = space();
			button = element("button");
			t7 = text("Log Name");
			this.h()
		},

		l(nodes) {
			h1 = claim_element(nodes, "H1", { class: true }, false);
			var h1_nodes = children(h1);

			t0 = claim_text(h1_nodes, "hello ");
			t1 = claim_text(h1_nodes, ctx.fullName);
			h1_nodes.forEach(detach);
			t2 = claim_text(nodes, "\n");

			label0 = claim_element(nodes, "LABEL", { class: true }, false);
			var label0_nodes = children(label0);

			t3 = claim_text(label0_nodes, "First: ");

			input0 = claim_element(label0_nodes, "INPUT", {}, false);
			var input0_nodes = children(input0);

			input0_nodes.forEach(detach);
			label0_nodes.forEach(detach);
			t4 = claim_text(nodes, "\n");

			label1 = claim_element(nodes, "LABEL", { class: true }, false);
			var label1_nodes = children(label1);

			t5 = claim_text(label1_nodes, "Last: ");

			input1 = claim_element(label1_nodes, "INPUT", {}, false);
			var input1_nodes = children(input1);

			input1_nodes.forEach(detach);
			label1_nodes.forEach(detach);
			t6 = claim_text(nodes, "\n");

			button = claim_element(nodes, "BUTTON", { class: true }, false);
			var button_nodes = children(button);

			t7 = claim_text(button_nodes, "Log Name");
			button_nodes.forEach(detach);
			this.h();
		},

		h() {
			h1.className = "svelte-14udb42";
			label0.className = "svelte-14udb42";
			label1.className = "svelte-14udb42";
			button.className = "svelte-14udb42";

			dispose = [
				listen(input0, "input", ctx.input0_input_handler),
				listen(input1, "input", ctx.input1_input_handler),
				listen(button, "click", ctx.logName)
			];
		},

		m(target, anchor) {
			insert(target, h1, anchor);
			append(h1, t0);
			append(h1, t1);
			insert(target, t2, anchor);
			insert(target, label0, anchor);
			append(label0, t3);
			append(label0, input0);

			input0.value = ctx.firstName;

			insert(target, t4, anchor);
			insert(target, label1, anchor);
			append(label1, t5);
			append(label1, input1);

			input1.value = ctx.lastName;

			insert(target, t6, anchor);
			insert(target, button, anchor);
			append(button, t7);
		},

		p(changed, ctx) {
			if (changed.fullName) {
				set_data(t1, ctx.fullName);
			}

			if (changed.firstName && (input0.value !== ctx.firstName)) input0.value = ctx.firstName;
			if (changed.lastName && (input1.value !== ctx.lastName)) input1.value = ctx.lastName;
		},

		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(h1);
				detach(t2);
				detach(label0);
				detach(t4);
				detach(label1);
				detach(t6);
				detach(button);
			}

			run_all(dispose);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	function logName() {
	console.log(fullName)
}
let { firstName = '', lastName = '' } = $$props;

	function input0_input_handler() {
		firstName = this.value;
		$$invalidate('firstName', firstName);
	}

	function input1_input_handler() {
		lastName = this.value;
		$$invalidate('lastName', lastName);
	}

	$$self.$set = $$props => {
		if ('firstName' in $$props) $$invalidate('firstName', firstName = $$props.firstName);
		if ('lastName' in $$props) $$invalidate('lastName', lastName = $$props.lastName);
	};

	let fullName;

	$$self.$$.update = ($$dirty = { firstName: 1, lastName: 1 }) => {
		if ($$dirty.firstName || $$dirty.lastName) { $$invalidate('fullName', fullName = firstName + ' ' + lastName); }
	};

	return {
		logName,
		firstName,
		lastName,
		fullName,
		input0_input_handler,
		input1_input_handler
	};
}

class NewSnippet extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-14udb42-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, ["firstName", "lastName"]);
	}
}