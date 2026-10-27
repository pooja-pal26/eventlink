/// <reference types="vite/client" />

// Audio assets imported by EventProgramSection. Vite resolves these to URLs at
// build time, but they have no type declaration of their own.
declare module '*.mpeg' {
    const src: string;
    export default src;
}
