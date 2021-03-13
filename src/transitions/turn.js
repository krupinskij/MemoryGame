export function turn(node, { duration }) {
		return {
			duration,
			css: t => {
				return `transform: scaleX(${t});`
			}
		};
	}