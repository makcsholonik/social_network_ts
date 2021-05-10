import React from "react";
import styles from "./Textarea.module.css"

export const Textarea = ( { input, meta, ...props } : any ) => {
	const hasError = meta.touched && meta.error;
	return (
		<div className={ styles.formControl + " " + (hasError ? styles.error : "") }>
			<div>
				<textarea { ...input } { ...props } />
			</div>
			{ hasError && <span>{ meta.error }</span> }
		</div>
	)
}