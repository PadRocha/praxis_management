extern crate proc_macro;

use proc_macro::TokenStream;

#[proc_macro_derive(Bycript)]
pub fn my_macro_here_derive(input: TokenStream) -> TokenStream {
    // ...
}

pub fn add(left: usize, right: usize) -> usize {
    left + right
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_works() {
        let result = add(2, 2);
        assert_eq!(result, 4);
    }
}
