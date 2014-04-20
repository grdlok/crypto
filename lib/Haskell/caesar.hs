import Data.Char
import System.Environment
import Text.CSV
import Data.Array

rot n alpha a = 
    case find([], alpha) of
      Just (l,r) -> shift n (l ++ cycle (reverse alpha)) (r ++ cycle alpha)
      Nothing -> a
    where
      find (l,x:r)
          | x == a = Just (l,x:r)
          | otherwise = find (x:l,r)
      find (l,[]) = Nothing
      shift n lh rh
          | n > 0 = shift (n-1) lh $ tail rh
          | n < 0 = shift (n+1) (tail lh) (head lh : rh)
          | otherwise = head rh

cipher n alpha = map (rot n alpha)

letters e = array (0, len) lst
    where
      len = length e - 1
      symbols = map head e
      (_, lst) = foldr (\next (c,lst) -> (c-1,(c,next):lst)) (len,[]) symbols

letters2 = concatMap head

main = do
  [lang, disp] <- getArgs
  langFile <- readFile lang
  case parseCSV lang langFile of
    Left e -> print e
    Right e -> interact $ cipher (read disp :: Int) $ letters2 e
