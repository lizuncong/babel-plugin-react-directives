import { dynamic as MyDynamic, useModel, history, SLPageLoad, type TS_TYPE } from '@/remote';
import type { ISiteSeoEditRef, IBackHeaderProps } from '@/remote';
import './index.jsx'

type a = TS_TYPE
type b = ISiteSeoEditRef
type c = IBackHeaderProps

console.log(MyDynamic, useModel, history, SLPageLoad)