import { dynamic as MyDynamic } from "appShell/dynamic";
import LZC from "appShell/lzc";
import { useModel } from "appShell/core";
import { history as My_History } from "appShell/core";
import SLPageLoad from "appShell/SLPageLoad";
import NN_LZC from "appShell/lzc";
console.log(MyDynamic, home, NN_LZC, LZC, useModel, My_History, SLPageLoad);



// import { My_History, SLPageLoad, type TS_TYPE } from '@/remote';
// import { LZC as NN_LZC } from '@/remote';

// import type { ISiteSeoEditRef, IBackHeaderProps } from '@/remote';

// type a = TS_TYPE
// type b = ISiteSeoEditRef
// type c = IBackHeaderProps

// console.log(MyDynamic, home, NN_LZC, LZC, useModel, My_History, SLPageLoad)
export { default as LZC } from 'appShell/lzc';

export { dynamic } from 'appShell/dynamic';
export { default as SLPageLoad, type TS_TYPE } from 'appShell/SLPageLoad';
export { useModel, history as My_History } from 'appShell/core';

import { dynamic as MyDynamic, LZC, useModel, My_History, SLPageLoad, type TS_TYPE } from '@/remote';
import { LZC as NN_LZC } from '@/remote';

import type { ISiteSeoEditRef, IBackHeaderProps } from '@/remote';

type a = TS_TYPE
type b = ISiteSeoEditRef
type c = IBackHeaderProps

console.log(MyDynamic, home, NN_LZC, LZC, useModel, My_History, SLPageLoad)