type IconProps = React.HTMLAttributes<SVGElement>

export const Icons = {
    logo: (props: IconProps) => (
        <svg title="logo" viewBox="0 0 24 24" {...props}>
            <title>logo</title>
            <rect x="2" y="2" width="20" height="20" rx="7" fill="#0F172A"/>
        </svg>
    ),
}