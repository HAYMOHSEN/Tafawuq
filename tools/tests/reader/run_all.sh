#!/bin/bash
# Reading Studio suites (18 files). Starts a static server if none is listening on :8765.
cd "$(dirname "$0")"
curl -s -o /dev/null http://localhost:8765/index.html || (nohup node ../serve.js 8765 > /tmp/tafserve.log 2>&1 & sleep 1)
: > /tmp/reader-all.log
for t in t1_read t2_listen t3_story t4_misc t5_audit t6_desktop t8_chips t9_overflow t10_narrow t11_leaks t12_fs t14_real_tts t15_all_units t16_trhint t17_hl_scope t18_leak_state t7_monkey; do
  [ -f $t.js ] || continue
  echo "##### $t" >> /tmp/reader-all.log
  timeout 170 node $t.js >> /tmp/reader-all.log 2>&1
  echo "exit $?" >> /tmp/reader-all.log
done
echo ALLDONE >> /tmp/reader-all.log
grep -c "^  ✓\|^✓\|PASS" /tmp/reader-all.log
grep -n "exit [1-9]\|FAIL\|✗" /tmp/reader-all.log | head -20
