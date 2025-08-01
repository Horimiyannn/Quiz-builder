export function formatEnum(enumValue: string) {
	if (!enumValue) return '';
	return enumValue
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
}
